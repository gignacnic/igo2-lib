import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { PrintOptions } from '../shared/print.interface';

import {
  PrintOutputFormat,
  PrintPaperFormat,
  PrintOrientation,
  PrintResolution,
  PrintSaveImageFormat
} from '../shared/print.type';

@Component({
  selector: 'igo-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.scss']
})
export class PrintFormComponent {
  public form: FormGroup;
  public submitted: boolean;

  public outputFormats = PrintOutputFormat;
  public paperFormats = PrintPaperFormat;
  public orientations = PrintOrientation;
  public resolutions = PrintResolution;
  public imageFormats = PrintSaveImageFormat;
  public isPrintService = true;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled = false;

  @Input()
  get imageFormat(): PrintSaveImageFormat {
    return this.imageFormatField.value;
  }
  set imageFormat(value: PrintSaveImageFormat) {
    this.imageFormatField.setValue(value || PrintSaveImageFormat.Jpeg, {
      onlySelf: true
    });
  }

  @Input()
  get outputFormat(): PrintOutputFormat {
    return this.outputFormatField.value;
  }
  set outputFormat(value: PrintOutputFormat) {
    this.outputFormatField.setValue(value || PrintOutputFormat.Pdf, {
      onlySelf: true
    });
  }

  @Input()
  get paperFormat(): PrintPaperFormat {
    return this.paperFormatField.value;
  }
  set paperFormat(value: PrintPaperFormat) {
    this.paperFormatField.setValue(value || PrintPaperFormat.Letter, {
      onlySelf: true
    });
  }

  @Input()
  get orientation(): PrintOrientation {
    return this.orientationField.value;
  }
  set orientation(value: PrintOrientation) {
    this.orientationField.setValue(value || PrintOrientation.landscape, {
      onlySelf: true
    });
  }

  @Input()
  get resolution(): PrintResolution {
    return this.resolutionField.value;
  }
  set resolution(value: PrintResolution) {
    this.resolutionField.setValue(value || PrintResolution['96'], {
      onlySelf: true
    });
  }

  @Input()
  get title(): string {
    return this.titleField.value;
  }
  set title(value: string) {
    this.titleField.setValue(value, { onlySelf: true });
  }

  @Input()
  get comment(): string {
    return this.commentField.value;
  }
  set comment(value: string) {
    this.commentField.setValue(value, { onlySelf: true });
  }
  @Input()
  get showProjection(): boolean {
    return this.showProjectionField.value;
  }
  set showProjection(value: boolean) {
    this.showProjectionField.setValue(value, { onlySelf: true });
  }
  @Input()
  get showScale(): boolean {
    return this.showScaleField.value;
  }
  set showScale(value: boolean) {
    this.showScaleField.setValue(value, { onlySelf: true });
  }
  @Input()
  get showLegend(): boolean {
    return this.showLegendField.value;
  }
  set showLegend(value: boolean) {
    this.showLegendField.setValue(value, { onlySelf: true });
  }

  @Input()
  get doZipFile(): boolean {
    return this.doZipFileField.value;
  }
  set doZipFile(value: boolean) {
    this.doZipFileField.setValue(value, { onlySelf: true });
  }


  get outputFormatField() {
    return <FormControl>this.form.controls['outputFormat'];
  }

  get paperFormatField() {
    return <FormControl>this.form.controls['paperFormat'];
  }

  get imageFormatField() {
    return <FormControl>this.form.controls['imageFormat'];
  }

  get orientationField() {
    return <FormControl>this.form.controls['orientation'];
  }

  get resolutionField() {
    return <FormControl>this.form.controls['resolution'];
  }

  get commentField() {
    return <FormControl>this.form.controls['comment'];
  }
  get showProjectionField() {
    return <FormControl>this.form.controls['showProjection'];
  }
  get showScaleField() {
    return <FormControl>this.form.controls['showScale'];
  }
  get showLegendField() {
    return <FormControl>this.form.controls['showLegend'];
  }

  get doZipFileField() {
    return <FormControl>this.form.controls['doZipFile'];
  }

  get titleField() {
    return <FormControl>this.form.controls['title'];
  }

  @Output() submit: EventEmitter<PrintOptions> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', []],
      comment: ['', []],
      outputFormat: ['', [Validators.required]],
      paperFormat: ['', [Validators.required]],
      imageFormat: [ '', [Validators.required]],
      resolution: ['', [Validators.required]],
      orientation: ['', [Validators.required]],
      showProjection: false,
      showScale: false,
      showLegend: false,
      doZipFile: [ {value: true, hidden: this.isPrintService } ]
    });
  }

  handleFormSubmit(data: PrintOptions, isValid: boolean) {
    this.submitted = true;
    data['isPrintService'] = this.isPrintService;
    if (isValid) {
      this.submit.emit(data);
    }
  }

  toggleImageSaveProp() {
    if (this.outputFormatField.value === 'Image') {
      this.isPrintService = false;
    } else {
      this.isPrintService = true;
    }
  }
}
