import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    console.log(`===>> queryParams says what:`, this.route.snapshot.queryParams);
    console.log(`==> fragment says what:`, this.route.snapshot.fragment);

    this.route.queryParams.subscribe(                          // with subscribe this will allow you to react to changed queryParams (like params, Observables)
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );                                
    this.route.fragment.subscribe();                                  // as above for changed fragment (like params, other Observables), ensuring not to miss data !!!   
    const id = +this.route.snapshot.params['id'];                        // + again !
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.params.subscribe(                                               // ready for changes !!
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);           // the + will ensure that the id is treated as a number instead of a string !!!
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !==  this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?')
    }else{
      return true;
    }
  }
}
