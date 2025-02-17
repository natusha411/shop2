import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/items";
import Categories from "./components/categories";
import ShowFullItem from "./components/ShowFullItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "Стул обеденный",
          img: "chair.jpg",
          desc: "Мягкий стул идеальный для всей семьи",
          category: "chairs",
          price: "49.99",
        },
        {
          id: 2,
          title: "Стол обеденный",
          img: "table.jpg",
          desc: "Шикарный стол из натурального дерева",
          category: "tables",
          price: "149.00",
        },
        {
          id: 3,
          title: "Диван",
          img: "sofa.jpg",
          desc: "Диван из натуральной кожи",
          category: "sofa",
          price: "549.00",
        },
        {
          id: 4,
          title: "Лампа",
          img: "light.jpg",
          desc: "Аутентичная лампа для гостиной",
          category: "light",
          price: "19.00",
        },
        {
          id: 5,
          title: "Камин",
          img: "fireplace.jpg",
          desc: "Камин для создания уюта",
          category: "fireplace",
          price: "619.00",
        },
      ],
      showFullItem: false,
      fullItem: {},
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.onCloseItem = this.onCloseItem.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Categories chooseCategory={this.chooseCategory} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />

        {this.state.showFullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullItem}
            onClose={this.onCloseItem}
          />
        )}
        <Footer />
      </div>
    );
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }

  onCloseItem() {
    this.setState({ showFullItem: false });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, item] });
  }
}

export default App;
