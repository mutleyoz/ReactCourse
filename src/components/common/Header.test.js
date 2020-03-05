import React from "react";
import Header from "./Header";
import {mount, shallow} from "enzyme";
import {MemoryRouter} from "react-router-dom";

// Note you can search for React component tag (NavLink) within shallow render
it("contains 3 NavLinks via shallow", () => {
    const numLinks = shallow(<Header />).find("NavLink").length;
    expect(numLinks).toEqual(3);
});

// with mount the child components are rendered out, thus we can locate anchor tags
if("contains 3 anchors via mount", () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header/>
        </MemoryRouter>
    ).find("a").length;

    expect(numAnchors).toEqual(3);
});
