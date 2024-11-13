import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SubAppModule } from './pages/sub-app/sub-app.module';
import { AuthModule } from './pages/auth/auth.module';
import { StaticModule } from './pages/static/static.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    SubAppModule,
    AuthModule,
    HttpClientModule,
    StaticModule
  ],
  // providers: [
  //   provideHttpClient(
  //     withInterceptorsFromDi() // Activar los interceptores del DI
  //   ),
  //   { provide: AuthInterceptor, useClass: AuthInterceptor } // Asegurarse de que AuthInterceptor esté registrado
  // ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
