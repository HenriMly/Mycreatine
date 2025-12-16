import { Product } from "../models/product.interface";

const imageUrl = "/image/mycreatinepot1.png";

export const mockedProducts: Product[] = [

    {
        id: "1",
        title: "Créatine X Trenbolone",
        description: "Formule avancée pour force et endurance accrues.",
        price: 24.9,
        stock: 150,
        imageUrl: imageUrl,
    },
    {
        id: "2",
        title: "Créatine X Synthol",
        description: "Soutien musculaire et récupération optimisée.",
        price: 32.9,
        stock: 80,
    },
    {
        id: "3",
        title: "Créatine X Monster-White",
        description: "Boostez vos performances avec cette créatine premium.",
        price: 27.9,
        stock: 60,
        imageUrl: imageUrl,
    },
];