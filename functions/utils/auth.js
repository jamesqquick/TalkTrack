const { NetlifyJwtVerifier, claimToArray } = require('@serverless-jwt/netlify');

const requireAuth = NetlifyJwtVerifier({
  issuer: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

const requirePermission = (permission, handler) =>
  requireAuth(async (event, context, cb) => {
    const { claims } = context.identityContext;
    // Require the token to contain a specific permission.
    if (
      !claims ||
      !claims.permissions ||
      claims.permissions.indexOf(permission) === -1
    ) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: 'access_denied',
          error_description: `Token does not contain the required '${permission}' permission`,
        }),
      };
    }

    // Continue.
    return handler(event, context, cb);
  });

module.exports = {
  requireAuth,
  requirePermission,
};
