module Product where

-- import Prelude
-- import Control.Monad.Aff (Aff)
-- import DOM.HTML.Types (HTMLElement)
-- import Data.Maybe (Maybe(..))
-- import Hallogen as H
-- import Halogen.HTML as HH
-- import Halogen.VDom.Driver (runUI)


-- data Query a
--  = HandleState State a

-- type State
--  = { price :: Number
--    , quantity :: Int
--    , title :: String }


-- -- the m here refers to any effects used in action handlers
-- product :: forall m. H.Component HH.HTML Query State void m
-- product = H.component
--      { initialState: id    -- id means we take state as input without any checks
--      , receiver: const Nothing
--      , render:render
--      , eval: eval
--      }


-- render :: State -> H.ComponentHTML Query
-- render { price, quantity, title } =
--   HH.div
--     []
--     []