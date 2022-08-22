import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    AuthModule,
    UsersModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        authScheme: "Bearer ",
        allowedDomains: ['localhost:8000'],
        disallowedRoutes: ['https://localhost:8000/api/login']
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
