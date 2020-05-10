import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

interface Server {
  id:number,
  status: string,
  name: string
}

export class ServerResolverService implements Resolve<Server> {
  resolve(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot,
  ): Observable<Server> | Promise<Server> | Server {}
}