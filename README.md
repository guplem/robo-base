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

1. Create a new project in the [Google Cloud Console](https://console.cloud.google.com).

2. Select the project in the top bar of the GCP console.

3. Enable the [Artifact Registry API](https://console.cloud.google.com/artifacts).

4. Install the [GCP CLI](https://cloud.google.com/sdk/docs/install) and verify the installation:
   ```bash
   gcloud --version
   ```

5. Log in to your GCP account:
   ```bash
   gcloud auth login
   ```

6. Set the project ID in your terminal:
   ```bash
   gcloud config set project <project-id>
   ```
   > The project ID can be found in the [GCP console](https://console.cloud.google.com/welcome).

7. Create a repository in Artifact Registry:
   ```bash
   gcloud artifacts repositories create cloud-run-source-deploy --repository-format=docker --location=europe-southwest1 --description="Docker repository for Cloud Run deployments"
   ```

8. Enable the [Cloud Build Triggers API](https://console.cloud.google.com/cloud-build/triggers).

9. Create a Cloud Build trigger:
   - Click "Create Trigger".
   - Set a name (e.g., "project-name-deploy").
   - In the *Source* section, choose your source repository. (You may need to link your GitHub account to GCP and grant access to the repository by selecting "*Edit repositories on GitHub*").
   - Specify the branch to trigger builds from.
   - Under "Configuration", choose "Cloud Build configuration file (yaml or json)".
   - Set the location to *Repository* and the path to `cloudbuild.yaml`.
   - Click "Create".

10. Create a Cloud Run service linked to the Cloud Build trigger:
    - Go to [Cloud Run](https://console.cloud.google.com/run).
    - Create the service.
    - Set the trigger to the one you just created.

11. Enable public access to the Cloud Run service:
    - In [Cloud Run](https://console.cloud.google.com/run), select the service.
    - Click on "Security".
    - Under "Authentication", select "Allow unauthenticated invocations".
    - Click "Save".

12. Update the `_SERVICE_NAME` variable in the `cloudbuild.yaml` file (under the *substitutions* section) to match the name of your Cloud Run service.

### Manual Deployment
To trigger a manual deployment, run:
```bash
gcloud builds submit --config=cloudbuild.yaml
```

## Working with the Codebase

This project uses [RoboJS's plugin system](https://robojs.dev/plugins/directory), where many features are implemented as plugins. Recommended plugins include:

### Synchronization of State between Clients

Use [@robojs/sync](https://robojs.dev/plugins/sync) for state synchronization. This is useful for shared experiences like games or collaborative applications.

The `useSyncState` hook creates a state synchronized between clients. The state can be shared across all clients or within a specific room (group of clients):
```typescript
import { useSyncState } from '@robojs/sync';

// For state shared across all clients
const [sharedState, setSharedState] = useSyncState<boolean>(false, ['uniqueId']);

// For state shared only within a room (group of clients)
const [channelState, setChannelState] = useSyncState<string>("", ['uniqueId', roomId]);
```