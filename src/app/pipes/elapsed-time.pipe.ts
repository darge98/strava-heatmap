import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that transforms a given time in milliseconds to a formatted string
 * representing elapsed time in the format HH:MM:SS.
 *
 * @Pipe - Decorator that marks the class as an Angular Pipe.
 * @name 'elapsedTime' - The name of the pipe to be used in templates.
 * @standalone true - Indicates that this pipe can be used independently.
 */
@Pipe({
  name: 'elapsedTime',
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  /**
   * Transforms the input time in milliseconds to a formatted string.
   *
   * @param ms - The time in milliseconds to be transformed.
   * @returns A string representing the elapsed time in the format HH:MM:SS.
   */
  transform(ms: number): string {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms %= (1000 * 60 * 60);
    const minutes = Math.floor(ms / (1000 * 60));
    ms %= (1000 * 60);
    const seconds = Math.floor(ms / 1000);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  /**
   * Pads a number with a leading zero if it is less than 10.
   *
   * @param value - The number to be padded.
   * @returns A string representation of the number, padded with a leading zero if necessary.
   */
  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

