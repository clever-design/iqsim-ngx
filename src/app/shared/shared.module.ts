import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroCustomModule } from './ng-zorro-custom.module';
import { MarkdownModule } from 'ngx-markdown';

import { IconsProviderModule } from './icons-provider.module';
import { CodeBlockComponent } from './code-block/code-block.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [
    FormsModule,
    CommonModule,
    IconsProviderModule,
    NgZorroCustomModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    FormsModule,
    IconsProviderModule,
    NgZorroCustomModule,
    MarkdownModule,
    CodeBlockComponent,
  ],
})
export class SharedModule {}
