import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/dashboard/account/account.component';
import { AuthGuard } from './guard/auth.guard';
import { ChannelComponent } from './components/dashboard/channel/channel.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "dashboard", component: DashboardComponent , children: [
        { path: "channel/:id", component: ChannelComponent, canActivate: [AuthGuard] },
        { path: "account", component: AccountComponent, canActivate: [AuthGuard]}
    ], canActivate: [AuthGuard]},
    { path: "**", redirectTo: "login", pathMatch: 'full' }
];
