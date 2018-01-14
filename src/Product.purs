module Product (format) where

import Prelude (map, show, ($), (<>))
import Data.Maybe

format :: String -> Number -> Maybe Int -> String
format title price quantity =
  title <> " - $" <> show price <> formatQuantity quantity

formatQuantity :: Maybe Int -> String
formatQuantity quantity =
  maybe "" (" x " <> _) $ map show quantity