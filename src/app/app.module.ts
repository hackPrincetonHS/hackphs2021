import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleComponent } from './components/title/title.component';
import { RegisterFrontpageComponent } from './components/register-frontpage/register-frontpage.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { BackgroundComponent } from './components_body1/background/background.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { MemberCarouselComponent } from './components/member-carousel/member-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    RegisterFrontpageComponent,
    AboutSectionComponent,
    BackgroundComponent,
    FaqSectionComponent,
    MemberCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
