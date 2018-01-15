module Product where

import Prelude
import Data.Either (Either(..))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Exception (Error)
import Control.Monad.Aff (Aff, runAff, Fiber)
import DOM.HTML.Types (HTMLElement)
import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.Aff.Effects as HAE
import Halogen.HTML as HH
import Halogen.VDom.Driver (runUI)

import ProductFormatting (format)


-- Note: Hardy Jones ran out of time to really dig into this,
-- so starting at around 25:00 of video 6/6 things start moving
-- very fast.
--
-- Still, the fact that we have a running example of react driving
-- halogen should be really helpful for starting to understand how
-- halogen really works (which, given it's type complexity, seems like
-- the key to actually grokking halogen)
--
-- Todo:
--  - study the types H.Component and H.HallogenM
--  - study the type of `main`, and `HAE.HallogenEffects`
--  - study the return type `Eff (HAE.HalogenEffects ()) a` of `runUI`
--  - go back to my standalone halogen demo and understand it better
--
-- It's worth investigating some other things that came up as well:
--  - purescript-aff-promise has conversions between purescript Aff
--    and javascript Promise types


data Query a
 = HandleState State a

type State
 = { price :: Number
   , quantity :: Maybe Int
   , title :: String }


-- the m here refers to any effects used in action handlers
product :: forall m. H.Component HH.HTML Query State Void m
product = H.component
     { initialState: id    -- id means we take state as input without any checks
     , receiver: const Nothing
     , render:render
     , eval: eval
     }


render :: State -> H.ComponentHTML Query
render { price, quantity, title } =
  HH.div
    []
    [ HH.text $ format title price quantity <> " (from halogen!)" ]


eval :: forall m. Query ~> H.ComponentDSL State Query Void m
eval (HandleState state next) = do
  H.put state
  pure next


type HalogenAff = Aff (HAE.HalogenEffects ())

runComponent :: HTMLElement ->
                State ->
                HalogenAff (State -> HalogenAff Unit)
runComponent node state = do
  io <- runUI product state node
  pure $ \newState -> io.query $ H.action $ HandleState newState

runFromJs :: forall eff a. Aff eff a ->
                           (a -> Eff eff Unit) ->
                           (Error -> Eff eff Unit) ->
                           Eff eff (Fiber eff Unit)
runFromJs aff onSuccess onFailure =
   runAff handleOutcome aff
     where handleOutcome (Right val) = onSuccess val
           handleOutcome (Left err) = onFailure err