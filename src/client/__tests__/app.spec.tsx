import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

// Mock any calls to fetch to return some mock data
(global as any).fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    items: [
      {
        id: 1001,
        name:
          "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
        dietaries: ["v", "ve", "df", "gf", "n!"],
      },
      {
        id: 1002,
        name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
        dietaries: ["gf", "df", "rsf"],
      },
      {
        id: 1003,
        name:
          "Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots",
        dietaries: ["gf", "df", "v", "ve", "n!"],
      },
    ],
  }),
});

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("App tests", () => {
  it("should populate items in the left-hand sidebar with data from the server", async () => {
    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByRole("listitem", {
          name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
        })
      )
    );

    expect(
      screen.getByRole("listitem", {
        name: /Search result - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
      })
    );

    expect(
      screen.getByRole("listitem", {
        name: /Search result - Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots/i,
      })
    );
  });

  it("should allow users to select items in the left-hand sidebar and have them appear in the Menu Preview on the right hand side", async () => {
    render(<App />);

    // Wait for the data to load.
    await screen.findByRole("listitem", {
      name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
    });

    // There should be no selected items
    expect(
      screen.queryAllByRole("listitem", { name: /^Selected item - /i })
    ).toHaveLength(0);

    // Click the second search result
    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
      })
    );

    // That item should now be selected
    await waitFor(() =>
      expect(
        screen.getByRole("listitem", {
          name: /Selected item - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
        })
      ).toBeInTheDocument()
    );
  });

  it("should allow users to filter items in the left-hand sidebar by name", async () => {
    render(<App />);

    // Wait for the data to load.
    await screen.findByRole("listitem", {
      name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
    });

    // Type in a search term of 'Chickpeas'
    fireEvent.input(screen.getByRole("textbox", { name: /Name/i }), {
      target: { value: "Chickpeas" },
    });

    // Expect the Kale Pasta search result to disappear
    await waitFor(() =>
      expect(
        screen.queryByRole("listitem", {
          name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
        })
      ).not.toBeInTheDocument()
    );

    // Expect the Potato cakes search result to disappear
    expect(
      screen.queryByRole("listitem", {
        name: /Search result - Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots/i,
      })
    ).not.toBeInTheDocument();

    // Expect the Chickpeas result to be still in the document
    expect(
      screen.getByRole("listitem", {
        name: /Search result - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
      })
    ).toBeInTheDocument();
  });

  it("should be possible to remove items from the menu by clicking the (x)", async () => {
    render(<App />);

    // Wait for the data to load.
    await screen.findByRole("listitem", {
      name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
    });

    // There should be no selected items
    expect(
      screen.queryAllByRole("listitem", { name: /^Selected item - /i })
    ).toHaveLength(0);

    // Click the second search result
    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
      })
    );

    // That item should now be selected
    await waitFor(() =>
      expect(
        screen.getByRole("listitem", {
          name: /Selected item - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
        })
      ).toBeInTheDocument()
    );

    // Now remove that item
    fireEvent.click(
      screen.getByRole("button", {
        name: /Remove item - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
      })
    );

    // That item should no longer be selected
    await waitFor(() =>
      expect(
        screen.queryByRole("listitem", {
          name: /Selected item - Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots/i,
        })
      ).not.toBeInTheDocument()
    );
  });

  it("should show the total number of selected items in the header", async () => {
    render(<App />);

    // Wait for the data to load.
    await screen.findByRole("listitem", {
      name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
    });

    // The count should be zero initially
    expect(screen.getByTestId("selected-items-count")).toHaveTextContent(
      "0 items"
    );

    // Click two items
    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
      })
    );

    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots/i,
      })
    );

    // Ensure the count is updated
    await waitFor(() =>
      expect(screen.getByTestId("selected-items-count")).toHaveTextContent(
        "2 items"
      )
    );
  });

  it("should show the total number of each dietary type selected in the header", async () => {
    render(<App />);

    // Wait for the data to load.
    await screen.findByRole("listitem", {
      name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
    });

    // There should be no dietary types initially
    expect(screen.getByTestId("selected-items-dietaries")).toHaveTextContent(
      ""
    );

    // Click two items
    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens/i,
      })
    );

    fireEvent.click(
      screen.getByRole("listitem", {
        name: /Search result - Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots/i,
      })
    );

    // Ensure the dietaries are updated
    await waitFor(() =>
      expect(screen.getByTestId("selected-items-dietaries")).toHaveTextContent(
        `2x v2x ve2x df2x gf2x n!`
      )
    );
  });
});
