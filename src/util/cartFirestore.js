import { db } from '../firebase'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'

export const storeCartToFirestore = async (userId, cartItems) => {
    if(!userId) return
    const cartRef = doc(db, "carts", userId)
    await setDoc(cartRef, {items: cartItems})
}

export const deleteCartFromFirestore = async (userId) => {
	await deleteDoc(doc(db, "carts", userId));
};

export const loadCartFromFirebase = async (userId) => {
    if (!userId) return;
    const cartRef = doc(db, "carts", userId)
    const docSnap = await getDoc(cartRef)
    if(docSnap.exists()){
        return docSnap.data()
    }
    return []
}