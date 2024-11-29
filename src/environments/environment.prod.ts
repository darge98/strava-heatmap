export const environment = {
  production: false,
  clientId: "${{ secrets.clientId }}",
  clientSecret: '${{ secrets.clientSecret }}',
  redirectUri: '${{ secrets.redirectUri }}'
};
