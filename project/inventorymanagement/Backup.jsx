const senddate = async () => {
  const name = document.getElementById("nametag").value;
  const quant = document.getElementById("quanttag").value;
  const price = document.getElementById("pricetag").value;

  const data = {
    name: name,
    quantity: quant,
    price: price
  };

  setdata(data); // update state for display

  try {
    const response = await fetch(`${URL}/backup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) // use local variable, not datastore
    });

    const info = await response.json();
    console.log(info);

    if (!info) {
      throw new Error("could not store the backup");
    }
  } catch (error) {
    console.error(error);
  }
};