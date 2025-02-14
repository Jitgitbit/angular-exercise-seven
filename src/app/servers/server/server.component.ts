import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];                             // the + will ensure that the id is treated as a number instead of a string !!!
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(                                               // ready for changes !!
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);           // the + will ensure that the id is treated as a number instead of a string !!!
    //   }
    // )
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['serverUsingResolver']                // so much shorter !
      }
    );
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
