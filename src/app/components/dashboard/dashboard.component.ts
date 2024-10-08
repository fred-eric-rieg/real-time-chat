import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from '../../shared/services/member.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private _snackBar = inject(MatSnackBar);

  constructor(private memberService: MemberService) {
    this.openSnackBar('Login successfull', 'Mkay', { duration: 5000 });
    this.memberService.fetchUser();
  }


  openSnackBar(message: string, action: string, arg2: { duration: number; }) {
    this._snackBar.open(message, action, arg2);
  }
}
