import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleComponent } from './title/title.component';
import { RegisterFrontpageComponent } from './register-frontpage/register-frontpage.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { MemberCarouselComponent } from './member-carousel/member-carousel.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    RegisterFrontpageComponent,
    AboutSectionComponent,
    FaqSectionComponent,
    MemberCarouselComponent,
    ScheduleComponent
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
