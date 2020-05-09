import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log(`===>> queryParams says what:`, this.route.snapshot.queryParams);
    console.log(`==> fragment says what:`, this.route.snapshot.fragment);
    this.route.queryParams.subscribe();                                // with subscribe this will allow you to react to changed queryParams (like params, Observables)
    this.route.fragment.subscribe();                                  // as above for changed fragment (like params, other Observables), ensuring not to miss data !!!   
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
