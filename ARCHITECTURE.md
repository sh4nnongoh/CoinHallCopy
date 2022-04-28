# Architecture

This being a frontend project, we have to work with the endpoints available to us.

```
/v1/charts/terra/pairs
/charts/terra/prices/latest
/charts/terra/prices/historical
```

We can take the data schema given to us and draw up our own Entity-Relationship diagram as follows:

![Entity-Relationship Diagram](doc/erdiag.jpg)

Each of the endpoint's response are represented by the Transport entities. We can then remodel them to suit our frontend needs. The LiquidityPool entity has two different prices associated with it: the latest price, and the previous 24hr price. The LiquidityPool also has two assets that form a pair in the pool. Those assets have their own pool information attach to them such as amount of tokens in the pool, and are represented as PoolAssetInfo entity. Each Asset entity may be part of multiple PoolAssetInfo entities, as an asset can have multiple liquidity pools.

We can further remodel the ER diagram by investigating how the data changes over time. For instance, the latest price and the historical 24hr price should be updated at the same time. We can remodel the Price entity to a Prices entity that encapsulates both the latest and historical 24hr price. On the other hand, the Asset entity can be split into two: AssetStaticInfo and AssetDynamicInfo. An Asset has data that should remain unchange over time such as the name, contract address, and social media links, while also having data that may change regularly such as the circulating supply.

This final ER diagram forms the backbone of our frontend application.

## Managing Application State

We will use React's ```useContext```, ```useState```, and other hooks to manage and store the application state, which can be visually represented using indentations as shown below. For full details refer to [CoinHallProvider.tsx](src/contexts/CoinHallProvider.tsx).
```
CoinHallAssetDynamicContext
  CoinHallAssetStaticContext
    CoinHallPoolDynamicContext  
      CoinHallPoolStaticContext  
        CoinHallMethodContext
          App
```

The application will be wrapped by the various contexts, allowing the application components to pull data and methods as needed. All methods / functions will be stored in the CoinHallMethodContext component as their execution do not change over the product lifecycle. Each of the entities has a separate static and dynamic context, allowing isolated rendering of individual components in the application. For instance, when price changes, only components that depend on objects from the CoinHallPoolDynamicContext need to be rerendered.