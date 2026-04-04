# Jordan Molacek Billiards Scoreboard

A modern, automated billiards scoreboard website that pulls data from Google Sheets.

## Setup Instructions

### 1. Google Sheets Integration
To display your games, you need to publish your Google Sheet as a CSV:
1. Open your Google Sheet.
2. Go to `File > Share > Publish to the web`.
3. Select the specific tab (e.g., "Jordan vs Ryan") and choose `Comma-separated values (.csv)`.
4. Copy the generated URL.
5. In `src/App.tsx`, update the `CSV_URLS` object with your actual URLs.

**Expected Column Headers:**
`Date, Jordan, Opponent, Location`

*   **Date:** The date of the games (e.g., 2024-05-20).
*   **Jordan:** The number of wins Jordan had on that date.
*   **Opponent:** The number of wins the opponent (e.g., Ryan) had on that date.
*   **Location:** Where the games were played.

The website will automatically sum the "Jordan" and "Opponent" columns to show the total overall score.

### 2. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named `jordan-molacek-billiards` (or update `.firebaserc` if you use a different name).
3. Enable **Hosting**.
4. Generate a Service Account Key:
   - Go to `Project Settings > Service accounts`.
   - Click `Generate new private key`.
   - Download the JSON file.

### 3. GitHub Secrets
To enable automated deployment, add these secrets to your GitHub repository:
1. `FIREBASE_SERVICE_ACCOUNT_JORDAN_MOLACEK_BILLIARDS`: The entire content of the Service Account JSON file you downloaded.
2. `GITHUB_TOKEN`: This is automatically provided by GitHub Actions, but ensure the workflow has "Read and write permissions" in `Settings > Actions > General`.

## Local Development
```bash
npm install
npm start
```

## Deployment
Push your changes to the `main` branch, and GitHub Actions will automatically build and deploy the site to Firebase Hosting.
