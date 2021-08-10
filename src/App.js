import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import { getOverview } from './services/purchases';
import './App.css';



function App() {

  const [purchases, setPurchases] = useState([]);
  const [overview, setOverview] = useState({
    sum: 0,
    avg: 0,
    num: 0
  });
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [taxrate, setTaxrate] = useState(0);
  const [gross, setGross] = useState(0.0);


  // when new purchase is recorded
  useEffect (() => {
    if (purchases.length) {
      setOverview(getOverview(purchases));
    }
  }, [purchases]);

  // when amount or tax input changes
  useEffect (() => {
    const num = parseFloat(cost);
    if ( !isNaN(num) ) {
      setGross(num*taxrate/100);
    }
    else {
      setGross(0.0);
    }
  }, [cost, taxrate])



  // name field value change
  function handleNameChange (e) {
    setName(e.target.value);
  }

  // amount field value change
  function handleCostChange (e) {
    setCost(e.target.value);
  }

  function handleTaxrateChange (e) {
    setTaxrate(e.target.value);
  }

  // handle add/reset button
  function handleSubmit (e, aim) {
    e.preventDefault();
    if (aim === "Add") {
      if (name.trim().length && cost.trim().length && !isNaN(parseFloat(cost)) && !isNaN(parseFloat(taxrate)) ) {
        addPurchase(name, cost);
      }
      else {
        alert("Enter valid inputs to add purchase");
      }
    }
    document.getElementById("AddItemForm").reset();
    setName("");
    setCost("");
    setTaxrate(0);
  }


  // add purchase to state
  function addPurchase(name, cost) {
    var newPurchases = purchases.slice(0)
    newPurchases.push({
      name: name,
      net: cost,
      tax: cost*taxrate/100,
    });
    setPurchases(newPurchases);
  }


  return (
    <div className="App">
      <Banner />
      <div className="Container">
        <div className="TopSection">
          <div className="AddItem">
            <form id="AddItemForm">
              <div className="FormUnit">
                <div className="label">Name *</div>
                <div>
                  <input 
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    autoComplete="off"
                    onChange={ (e) => handleNameChange(e) }
                  />
                </div>
              </div>
              <div className="FormUnit">
                <div className="label">Net *</div>
                <div>
                  <input
                    type="text"
                    name="net"
                    placeholder="Enter cost"
                    autoComplete="off"
                    onChange={ (e) => handleCostChange(e) }
                  />
                </div>
              </div>
              <div className="FormUnit">
                <div className="label">Tax rate* (%)</div>
                <div>
                  <input
                    type="text"
                    name="taxrate"
                    value={taxrate}
                    placeholder="Enter tax rate"
                    autoComplete="off"
                    onChange={ (e) => handleTaxrateChange(e) }
                  />
                </div>
              </div>
              <div className="Gross">
                Gross: $ {gross.toFixed(2)}
              </div>
              <div className="Buttons">
                <input type="button" value="Add" onClick={(e) => handleSubmit(e, 'Add')} />
                <input type="button" value="Reset" onClick={(e) => handleSubmit(e, 'Reset')} />
              </div>
            </form>
          </div>
          <div className="Overview">
            <div className="Metrics">
              <div>Overview</div>
              <div>Total Gross</div> 
              <div>Average</div>
              <div>Total Items</div>
            </div>
            <div className="OverviewMag">
              <div></div>
              <div>$ {overview.sum}</div>
              <div>$ {overview.avg}</div>
              <div>{overview.num}</div>
            </div>
          </div>
        </div>
        <div className="Purchases">
          <div className="PurchaseHeaders">
            <div>Name</div>
            <div>Net</div>
            <div>Tax</div>
            <div>Gross</div>
          </div>
          {purchases.map((purchase, idx) => {
            const gross = parseFloat(purchase.net) + parseFloat(purchase.tax)
            return (
              <div className="Purchase" key={idx}>
                <div>{purchase.name}</div>
                <div>$ {parseFloat(purchase.net).toFixed(2)}</div>
                <div>$ {parseFloat(purchase.tax).toFixed(2)}</div>
                <div>$ {gross.toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
