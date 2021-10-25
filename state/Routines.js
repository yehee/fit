import { createState, useState } from '@hookstate/core';

const upperBodyRoutine = [
    { title: "Warm up", duration: 90 },
    { title: "Muscle release" },
    { title: "Chest press", info: "12.5 lbs" },
    { title: "Dumbbell rows", info: "15 lbs" },
    { title: "Shoulder press", info: "10 lbs" },
    { title: "Lat pull down", info: "30 lbs, using machine" },
    { title: "Rope pull down", info: "9 lbs" },
    { title: "Stretch" },
]

const lowerBodyRoutine = [
    { title: "Warm up", duration: 5 },
    { title: "Muscle release" },
    { title: "Bands loop activation", reps: 10, info: "Orange loop" },
    { title: "Squats", info: "55 lbs" },
    { title: "Romanian deadlifts", info: "50 lbs" },
    { title: "Stability ball hamstring curls" },
    { title: "Walking longes", reps: 20, info: "15 lbs" },
    { title: "Stretch" },
]

const initialRoutines = [
    { title: "Upper body", duration: 2190, routine: upperBodyRoutine },
    { title: "Lower body", duration: 2105, routine: lowerBodyRoutine },
]

const routinesState = createState(initialRoutines);

export const useGlobalState = () => {
    const routines = useState(routinesState);
    return {
        get: () => routines.value,
        addToRoutines: (product) => {
            if (routines.products[`item-${product.id}`].value) {
                routines.products[`item-${product.id}`].merge({ quantity: routines.products[`item-${product.id}`].quantity.value + 1 });
                routines.size.set(routines.size.value + 1);
            } else {
                routines.products.merge({ [`item-${product.id}`]: { ...product, quantity: 1 } });
                routines.size.set(routines.size.value + 1);
            }
        },
    };
};
