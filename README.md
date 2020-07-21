# [Zest Menu App](https://blooming-hamlet-91667.herokuapp.com/)

![Zest Menu App](https://i.imgur.com/tIM1KIF.png)

### Core Functionality

Zest offers restaurant owners a simple and elegant solution to mobile menus. Its image-focused design allows the food to speak for itself.

Zest Menu's are fully mobile responsive and incredibly user friendly. No more pinching and zooming or waiting for PDF's to download.

Creating a menu on Zest is just as user friendly. Simply define your menus categories and begin adding menu items. You can easily rearrange the order of categories with Zest's simple drag and drop functionality. Editing and removing menu items only takes second and your changes will be made live as soon as you're done.

### Technologies

- [Create React App](https://github.com/facebook/create-react-app)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- AWS S3
- MongoDB
- Express
- Node

## Favorite Functionality

```javascript
sortMenu = (menu) => {
  menu.sort((a, b) => {
    if (a.catOrderId > b.catOrderId) {
      return 1;
    } else {
      return -1;
    }
  });

  const nextCatOrderId = menu[menu.length - 1].catOrderId + 1;

  this.setState({
    menu,
    catOrderId: nextCatOrderId,
  });
};
```

While there is nothing particularly earth shattering about the function above it is the true unsung hero of this project. When changes are made to the menu a call is made to the DB to update those changes. The new menu is returned and then the sortMenu function is called with the object (menu) that is returned from the DB as it's argument. sortMenu then sorts the categories so they appear in the order that the user has set and sets state with the newly sorted object (menu). State has been updated and each component tied to that state re-renders and the menu changes are live across the site.

### Roadmap

- Add the ability for restaurant owners to create an account and add their own menu which lives at a unique Zest url (i.e. zest.com/my-restaurant)

- Give restaurant owners the ability to add their logo to the top of the menu.

- Give restaurant owners the ability to add social media links to the bottom of the menu.

- Extend drag and drop functionality to menu items allowing the restaurant owner the ability to reorder items and even drag them into different categories.

- Add the ability for restaurant owners to create multiple menus (breakfast, lunch, dinner, happy hour) and choose the times when each menu should be displayed.

### Contributors

- Coffee
- Dr. Yerase Board
