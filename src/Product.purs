module Product (format, formatJs) where

import Prelude (map, show, ($), (<>))
import Data.Maybe
import Data.Function.Uncurried (Fn3, mkFn3)

formatJs :: Fn3 String Number (Maybe Int) String
formatJs = mkFn3 format

format :: String -> Number -> Maybe Int -> String
format title price quantity =
  title <> " - $" <> show price <> formatQuantity quantity

formatQuantity :: Maybe Int -> String
formatQuantity quantity =
  maybe "" (" x " <> _) $ map show quantity