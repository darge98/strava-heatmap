import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing authentication tokens in local storage.
 */
export class TokenService {

  /**
   * Saves a token to local storage.
   *
   * @param key - The key under which the token is stored.
   * @param value - The token value to be stored.
   */
  saveToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Retrieves a token from local storage.
   *
   * @param key - The key of the token to retrieve.
   * @returns The token value associated with the key, or null if not found.
   */
  getToken(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * Checks if a token exists in local storage.
   *
   * @param key - The key of the token to check.
   * @returns True if the token exists, false otherwise.
   */
  hasToken(key: string) {
    return localStorage.getItem(key) != null;
  }
}
