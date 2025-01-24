import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CasesCreatePageRoutingModule } from './cases-create-routing.module';
import { CasesCreatePage } from './cases-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasesCreatePageRoutingModule,
  ],
  declarations: [],
})
export class CasesCreatePageModule {}
