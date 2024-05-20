import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../shared/token.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService  = inject(TokenService)
  const authToken = tokenService.getToken()

  console.log(authToken)

  if (authToken) {
    // Clone the request and attach the token
    const authReq = req.clone({
      setHeaders: {
        x_access_token: authToken,
        Authorization: `Bearer ${authToken}`,
        
        
      }
    });

  return next(authReq);
  };
  return next(req);
}
