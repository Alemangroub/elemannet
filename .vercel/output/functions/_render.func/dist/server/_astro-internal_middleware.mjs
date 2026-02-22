import { d as defineMiddleware, s as sequence } from './chunks/index_B5CzvMnL.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D31PW6Ha.mjs';
import 'piccolore';
import './chunks/astro/server_Cggvz1LX.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware((context, next) => {
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
