module.exports = {
  title: process.env['APP_TITLE'],
  apiUrl: process.env['APP_API_URL'] || 'http://127.0.0.1:3333/api/',
  auth: {
    authority:
      process.env['APP_AUTH_API_URL_AUTHORITY'] ||
      'https://a-qa.ncats.io/_api/auth/hits_ci',
    redirectUrl:
      process.env['APP_AUTH_REDIRECT_URL'] || 'https://local.mylocal.org:4200',
    postLogoutRedirectUri:
      process.env['APP_AUTH_POST_LOGOUT_REDIRECT_URL'] ||
      'https://local.mylocal.org:4200',
    clientId: process.env['APP_AUTH_CLIENT_ID'] || 'hits',
    scope:
      process.env['APP_AUTH_API_SCOPES'] ||
      'openid profile offline_access email',
    responseType: process.env['APP_AUTH_API_RESPONSE_TYPE'] || 'code',
    silentRenew: process.env['APP_AUTH_API_SILENT_RENEW'] || true,
    useRefreshToken: process.env['APP_AUTH_API_USE_REFRESH_TOKEN'] || true,
    renewTimeBeforeTokenExpiresInSeconds:
      process.env['APP_AUTH_API_UTOKEN_EXPIRE_TIME'] || 30,
    secureRoutes: ['http://localhost:8000', process.env['APP_API_URL']],
  },
};
