import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.route.params.subscribe(                                // with params as an OBSERVABLE, subscribing to it will wait for an "in case that"  !!!
      (params: Params) => {                                     // handy in case you are already in the same component, otherwise Angular will ignore the route change !!!
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }
  ngOnDestroy(){}

}
