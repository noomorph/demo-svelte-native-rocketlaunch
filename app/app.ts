/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from 'svelte-native'
import './services'; // initialize composition root
import App from './App.svelte'
import {registerNativeViewElement} from "svelte-native/dom";

registerNativeViewElement('pullToRefresh', () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh);
svelteNative(App, {})
