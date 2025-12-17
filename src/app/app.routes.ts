import { Routes } from '@angular/router';
import { Body } from './body/body';
import { ProductPage } from './product-page/product-page';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
	{ path: '', component: Body, pathMatch: 'full' },
	{ path: 'products', component: ProductPage },
	{ path: 'product/:id', component: ProductDetail },
	{ path: '**', redirectTo: '' },
];