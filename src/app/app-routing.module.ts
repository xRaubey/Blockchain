import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {BuyComponent} from './buy/buy.component';
import {SellComponent} from './sell/sell.component';
import {UserLoggedInComponent} from './user-logged-in/user-logged-in.component';

const routes: Routes = [
    {path: 'index', component: IndexComponent},
    {path: 'user', component: UserComponent, children: [
        {path: 'user-detail/:id', component: UserDetailComponent}
    ]},
    {path: 'buy', component: BuyComponent},
    {path: 'sell', component: SellComponent},
    {path: 'logged/:id', component: UserLoggedInComponent},
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
