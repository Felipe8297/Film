
import produce from 'immer'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { saveLocalStorage, fetchLocalStorage } from './utils'

export interface Movie {
  id: number
  title: string
  price: number
  image: string
}

export interface CartItem extends Movie {
  quantity: number
}

interface ChangeCartItemQuantityProps {
  itemId: number
  type: 'increase' | 'decrease'
}

interface ContextType {
  cartItems: CartItem[]
  cartItemsTotal: number
  cartQuantity: number
  addMovieToCart: (movie: CartItem) => void
  changeCartItemQuantity: (value: ChangeCartItemQuantityProps) => void
  cleanCart: () => void
  movieExistsInCart: (itemId: number) => number
  quantityMovieInStorage: (itemId: number) => number
  removeCartItem: (itemId: number) => void
}

interface ContextProviderProps {
  children: ReactNode
}

export const Context = createContext({} as ContextType)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.length

  const cartItemsTotal = useMemo(
    () =>
      cartItems.reduce(
        (totalPrice, movie) => (totalPrice += movie.price * movie.quantity),
        0,
      ),
    [cartItems],
  )

  const movieExistsInCart = useCallback(
    (movieId: number) => cartItems.findIndex(({ id }) => id === movieId),
    [cartItems],
  )

  const addMovieToCart = useCallback(
    (movie: CartItem) => {
      const movieAlreadyExistsInCart = movieExistsInCart(movie.id)

      const newCart = produce(cartItems, (draft) => {
        if (movieAlreadyExistsInCart < 0) {
          draft.push(movie)
        } else {
          draft[movieAlreadyExistsInCart].quantity += movie.quantity
        }
      })

      setCartItems(newCart)
    },
    [cartItems, movieExistsInCart],
  )

  const changeCartItemQuantity = useCallback(
    ({ itemId, type }: ChangeCartItemQuantityProps) => {
      const newCart = produce(cartItems, (draft) => {
        const movieAlreadyExistsInCart = movieExistsInCart(itemId)

        if (movieAlreadyExistsInCart >= 0) {
          const { quantity } = draft[movieAlreadyExistsInCart]

          if (type === 'decrease' && quantity <= 1) {
            draft.splice(movieAlreadyExistsInCart, 1)
            return
          }

          draft[movieAlreadyExistsInCart].quantity =
            type === 'increase' ? quantity + 1 : quantity - 1
        }
      })

      setCartItems(newCart)
    },
    [cartItems, movieExistsInCart],
  )

  const removeCartItem = useCallback(
    (itemId: number) => {
      const newCart = produce(cartItems, (draft) => {
        const movieAlreadyExistsInCart = movieExistsInCart(itemId)

        if (movieAlreadyExistsInCart >= 0) {
          draft.splice(movieAlreadyExistsInCart, 1)
        }
      })

      setCartItems(newCart)
    },
    [cartItems, movieExistsInCart],
  )

  const quantityMovieInStorage = useCallback(
    (movieId: number) => {
      if (!cartItems || cartItems.length <= 0) return 0

      const movieAlreadyExistsInCart = movieExistsInCart(movieId)

      if (movieAlreadyExistsInCart < 0) return 0

      return cartItems[movieAlreadyExistsInCart]?.quantity
    },
    [cartItems, movieExistsInCart],
  )

  const cleanCart = useCallback(() => {
    setCartItems([])
    saveLocalStorage([])
  }, [])

  useEffect(() => {
    if (cartItems.length === 0) return

    saveLocalStorage(cartItems)
  }, [cartItems])

  useEffect(() => {
    const localCartItems = fetchLocalStorage()
    setCartItems(localCartItems)
  }, [])

  return (
    <Context.Provider
      value={{
        cartItems,
        cartItemsTotal,
        cartQuantity,
        addMovieToCart,
        changeCartItemQuantity,
        cleanCart,
        movieExistsInCart,
        quantityMovieInStorage,
        removeCartItem,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCart = () => {
  const context = useContextSelector(Context, (context) => context)
  return context
}
