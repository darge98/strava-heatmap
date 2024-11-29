export const environment = {
  production: true,
  clientId: "${{ SECRETS.CLIENT_ID }}",
  clientSecret: '${{ SECRETS.CLIENT_SECRET }}',
  redirectUri: '${{ SECRETS.REDIRECT_URI }}'
};
