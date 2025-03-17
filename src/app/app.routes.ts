import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { ContatoListComponent } from './components/contato/contato-list/contato-list.component';
import { ContatoFormComponent } from './components/contato/contato-form/contato-form.component';


export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path:"login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "contatos", component: ContatoListComponent},
        //{path: "usuarios", component: UsuarioslistComponent},
        {path: "contatos/new", component: ContatoFormComponent},
        {path: "contatos/edit/:id", component: ContatoFormComponent}
        //{path: "usuarios/new", component: UsuariosdetailsComponent},
        //{path: "usuarios/edit/:id", component: UsuariosdetailsComponent},
    ]}
];
