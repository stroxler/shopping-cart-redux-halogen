module ProductFormatting (format, formatJs, logPrice) where

-- note: the discard is needed for using do notation
import Prelude (map, show, ($), (<>), discard, pure, (+))
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff (Eff)
import Data.Maybe (Maybe, maybe)
import Data.Function.Uncurried (Fn3, mkFn3)


logPrice :: forall e. Number -> Eff (console :: CONSOLE | e) String
logPrice price = do
  log $ "The price coming in is " <> show price
  pure $ "If we were to increment the price it would be " <> show (price + 1.0)


formatJs :: Fn3 String Number (Maybe Int) String
formatJs = mkFn3 format

format :: String -> Number -> Maybe Int -> String
format title price quantity =
  title <> " - $" <> show price <> formatQuantity quantity

formatQuantity :: Maybe Int -> String
formatQuantity quantity =
  maybe "" (" x " <> _) $ map show quantity