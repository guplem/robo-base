# robo-base
A base project for creating an easily-deployable WebApp using [RoboJS](https://robojs.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) v22 or newer
- [npm](https://www.npmjs.com/)
- A [Google Cloud Platform (GCP)](https://console.cloud.google.com/) account and [GCP CLI](https://cloud.google.com/sdk/docs/install) (for deployment)

## Setup

1. Fork this repository or use it as a template for your own project.

2. Clone your repository and navigate to its directory.

3. Create a new project using the RoboJS CLI. Replace `<projectName>` with your desired project name:
   ```bash
   npx create-robo <projectName> && mv <projectName>/* . && rmdir <projectName>
   ```
   > A couple of warnings regarding moving files after running the command are expected. They can be ignored.

4. Select *Web Application* as the project type.

5. Enable the following features for the project:
   - *TypeScript*
   - *React*
   - *Prettier*
   - *ESLint*
   > See linting documentation [here](https://robojs.dev/robojs/linting).

6. Enable *Sync* if your project requires state synchronization between clients.

   > See the [Synchronization of State between Clients](#synchronization-of-state-between-clients) section for more details.

## Development Mode and Local Hosting

Start the development server with hot reloading:

> Ensure you have run `npm install` before starting the development server.

```bash
npx robo dev
```

After running the command:
- The server will start at `http://localhost:3000/`.
- A tunnel  will allow external access to the server (the URL will be present in the console). This can be used for testing on mobile devices or sharing with others.

## Deployment

### Google Cloud

This project is pre-configured for automatic deployment to Google Cloud Run using a custom build process defined in `cloudbuild.yaml`.

1. In the file located in `config\plugins\robojs\server.ts`, add the `hostname` parameter to the sever configuration with the value of `0.0.0.0`:
   ```typescript
   export default {
      cors: true,
      hostname: '0.0.0.0'
      // other options...
   }
   ``` 

2. Update the `_SERVICE_NAME` variable in the `cloudbuild.yaml` file (under the *substitutions* section) so it has a recognizable name. This name will be used to create the Cloud Run service (e.g., "project-name-service").

3. Create a new project in the [Google Cloud Console](https://console.cloud.google.com).

4. Select the project in the top bar of the GCP console.

5. Enable the [Artifact Registry API](https://console.cloud.google.com/artifacts).

6. Install the [GCP CLI](https://cloud.google.com/sdk/docs/install) and verify the installation:
   ```bash
   gcloud --version
   ```

7. Log in to your GCP account:
   ```bash
   gcloud auth login
   ```

8. Set the project ID in your terminal:
   ```bash
   gcloud config set project <project-id>
   ```
   > The project ID can be found in the [GCP console](https://console.cloud.google.com/welcome).

9. Create a repository in Artifact Registry:
   ```bash
   gcloud artifacts repositories create cloud-run-source-deploy --repository-format=docker --location=europe-southwest1 --description="Docker repository for Cloud Run deployments"
   ```

   > The location can be changed to your preferred region. The command above uses `europe-southwest1` as an example.

10. Enable the [Cloud Build Triggers API](https://console.cloud.google.com/cloud-build/triggers).

11. Create a Cloud Build trigger:
   - Click "Connect Repository",
   - Link your GitHub account to GCP and grant access to the repository by selecting "*Edit repositories on GitHub*".
   - Select *Create a trigger* after selecting the repository.
   - Set a name (e.g., "project-name-deploy").
   - Inside the *Source* section, specify the branch to trigger builds from (the default is `main`).
   - Inside the *Configuration* section, choose "Cloud Build configuration file (YAML or JSON)".
   - Set the location to *Repository* and the path to `cloudbuild.yaml` (it is pribably already set by default).
   - Select a service account.
   - Click "Create".

12. Set up the service account with the necessary permissions:
   - Go to the [IAM & Admin](https://console.cloud.google.com/iam-admin/iam) page.
   - Find the service account you selected in the previous step (it should have a name like `something@something.gserviceaccount.com`).
   - Click on the pencil icon to edit the service account.
   - *Add* the following role: `Cloud Run Admin`.
   - Click "Save".

13. Trigger the first build:
    - Go to the [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers) page.
    - Click on the "Run" button next to the trigger you just created.

    > Alternatively, you can push a commit to the branch you specified in the trigger settings. This will automatically trigger a build.

The build process will automatically:
- Create a Cloud Run service with your specified name if it doesn't exist
- Configure it with public access (allow unauthenticated invocations)
- Enable cold boot capabilities (CPU throttling when idle)
- Set maximum CPU scaling to 3 CPUs

### Manual Deployment
To trigger a manual deployment, run:
```bash
gcloud builds submit --config=cloudbuild.yaml
```

## Working with the Codebase

This project uses [RoboJS's plugin system](https://robojs.dev/plugins/directory), where many features are implemented as plugins. Recommended plugins include:

### State Management
Use [Robo's state management](https://robojs.dev/robojs/state) to temprorarily store data in memory. This is useful for storing data that doesn't need to be persisted across server restarts or for storing data that is only needed during the lifetime of the application.

#### Synchronization of State between Clients
Use [@robojs/sync](https://robojs.dev/plugins/sync) for state synchronization. This is useful for shared experiences like games or collaborative applications.

The `useSyncState` hook creates a state synchronized between clients. The state can be shared across all clients or within a specific room (group of clients):
```typescript
import { useSyncState } from '@robojs/sync';

// For state shared across all clients
const [sharedState, setSharedState] = useSyncState<boolean>(false, ['uniqueId']);

// For state shared only within a room (group of clients)
const [channelState, setChannelState] = useSyncState<string>("", ['uniqueId', roomId]);
```

### Shared Data
Robo comes bundled with [Flashcore Database](https://robojs.dev/robojs/flashcore), a key-value pair database. It is a simple and fast database that can be used for storing data in your application accessible from all clients. It is not a full-fledged database, but it is useful for storing small amounts of data.

```typescript
import { Flashcore } from 'robo.js'
import type { CommandInteraction } from 'discord.js'

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id

	const score = await Flashcore.get(userId)
	return score ? `High score alert: ${score}! 🏆` : 'No high score found. Game time! 🎮'
}
```

> **Be careful**, Flashcore will not persist the data outside the container. So *if the container is restarted or killed because it has cold-boot enabled, all data will be lost*.

It also allows [watching for changes](https://robojs.dev/robojs/flashcore#watching-for-changes) in the database with the `Flashcore.on(...)` method and `Flashcore.off(...)` method to stop watching for changes.

### API
Robo comes bundled with [@robojs/server](https://robojs.dev/plugins/server), a simple server for creating and managing API endpoints.

```typescript
export default (request, reply) => {
	if (request.method !== 'GET') {
		throw new Error('Method not allowed')
	}

	const userId = request.params.id

	// ... perform some action with userId

	return { message: `User ID is ${userId}` }
}
```

### Other Features
Checkout the [RoboJS documentation](https://robojs.dev/) for more information on available [plugins](https://robojs.dev/plugins) and [features](https://robojs.dev/robojs/overview).

Some interesting features might be:
- [Logger](https://robojs.dev/robojs/logger): A simple but powerful logger for your application.
- [Running Mode](https://robojs.dev/robojs/mode): A way to select which `.env` file to use based on the running mode of your application. This is useful for separating development and production environments, testing the balance of a game, or any other use case where you need to run the same code with different configurations.
- [Scheduled Tasks](https://robojs.dev/plugins/cron): A plugin for scheduling tasks to run at specific intervals or times.

And many more! **It is worth checking out the [plugins](https://robojs.dev/plugins) and [features](https://robojs.dev/robojs/overview) available** in RoboJS.