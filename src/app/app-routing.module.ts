import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children:[
    {path: ':id/:name', component: UserComponent},          //the colon indicates that it has to be dynamic
  ]},
  {path: 'servers', 
    // canActivate:[AuthGuardService], 
    canActivateChild:[AuthGuardService], 
    component: ServersComponent, 
    children:[
      {path: ':id', component: ServerComponent, resolve: {serverUsingResolver: ServerResolverService}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]}
    ]},
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: "Page not found, error!"} },
  {path: '**', redirectTo: '/not-found'}                      // THE ORDER IS SUPER IMPORTANT, THE GENERIC PATH ** HAS TO BE THE VERY LAST ONE !!!!!!!!!!!
];                                                           // IF IT WOULD BE ON TOP, YOU WOULD ALWAYS BE REDIRECTED

@NgModule({
  imports: [ 
    RouterModule.forRoot(appRoutes, {useHash: true}),        //this will tell the webserver to only care about the part before the # !!!
  ],                                                        //the webserver always parses the URL, so this can be of critical importance
  exports: [RouterModule]
})
export class AppRoutingModule {}