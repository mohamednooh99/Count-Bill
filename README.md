# Bill Splitter App

**Live Demo**  https://mohamednooh99.github.io/Count-Bill/

The **Bill Splitter App** is a user-friendly application built with React that allows users to manage their friends and easily split bills among them. This app provides a simple interface for adding friends, tracking balances, and calculating how much each person owes after shared expenses.

###  Features

- **Friend Management:**

Add new friends with a name and an avatar image.
View a list of friends along with their current balance, indicating whether they owe you or you owe them.

- **Dynamic Bill Splitting:**
Select a friend and input a bill amount to split.
Indicate how much each person contributed to the bill.
The app automatically calculates the balances based on contributions.

- **User-Friendly Interface:**
Intuitive UI that provides a clear display of friends and their respective balances.
Buttons for adding friends and selecting them for bill splitting.

- **Real-time Updates:**
Instant updates to the friends' balance whenever a bill is split, ensuring accurate tracking of expenses.

- **Responsive Design:**
The app is styled to be responsive, providing a seamless experience on various screen sizes.

## How It Works

-**Adding Friends:**
Users can add friends by entering their name and image URL. The app generates a unique ID for each friend.

- **Selecting Friends:**
Friends can be selected from a list to split bills with. Clicking on a friend's name toggles their selection status.

- **Splitting Bills:**
Once a friend is selected, users can enter the total bill amount and how much they paid. The app will automatically calculate how much the selected friend owes or vice versa.
The functionality prevents users from entering an expense greater than the total bill.

- **Viewing Balances:**
The app displays whether a friend owes money or is owed money based on their balance.
