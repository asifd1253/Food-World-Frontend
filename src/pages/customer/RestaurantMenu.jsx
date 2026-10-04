import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MenuCategory from "../../components/MenuCategory";
import MenuShimmer from "../../components/MenuShimmer";
import useRestuarantMenu from "../../hooks/useRestaurantMenu";

const RestaurantMenu = () => {
  const { restaurantId } = useParams();

  const { restaurantInfo, menuItems, isLoading } =
    useRestuarantMenu(restaurantId);

  // console.log(restaurantInfo);
  const [searchMenuText, setSearchMenuText] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  // const [showCategory, setShowCategory] = useState(0);

  // group the items based on their filteredMenuItems
  const groupedMenuItems = filteredMenuItems.reduce((acc, curItem) => {
    if (!acc[curItem.category]) {
      acc[curItem.category] = [];
    }
    acc[curItem.category].push(curItem);

    return acc;
  }, {});

  useEffect(() => {
    const searchTextLower = searchMenuText.toLowerCase();
    const filteredMenu = menuItems.filter((curItem) => {
      const curItemName = curItem?.name?.toLowerCase() || "";
      const curItemDescription = curItem?.description?.toLowerCase() || "";
      const curItemCategory = curItem?.category?.toLowerCase() || "";

      return (
        curItemName.includes(searchTextLower) ||
        curItemDescription.includes(searchTextLower) ||
        curItemCategory.includes(searchTextLower)
      );
    });
    setFilteredMenuItems(filteredMenu);
  }, [searchMenuText, menuItems]);

  if (isLoading) {
    return <MenuShimmer />;
  }
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Restaurant Banner */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 px-6 py-8 text-white sm:px-8">
            {/* Upper part banner */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {/* Restaurant Details */}
              <div>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {restaurantInfo.name || "Restaurant"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
                  {restaurantInfo.cuisines?.join(", ") ||
                    "Delicious food and beverages"}
                </p>
              </div>
              {/* Restaurant stats */}
              <div className="grid grid-cols-3 gap-3 text-center sm:min-w-80">
                <div className="rounded-xl bg-white/15 px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Rating</p>
                  <p className="mt-1 text-lg font-bold">
                    {restaurantInfo.avgRating || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl bg-white/15 px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Area</p>
                  <p className="mt-1 text-lg font-bold">
                    {restaurantInfo.areaName || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl bg-white/15 px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Items</p>
                  <p className="mt-1 text-lg font-bold">{menuItems.length}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom part banner */}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-6 py-4 text-sm text-slate-600 sm:px-8">
            {/* cusines */}
            {restaurantInfo.cuisines?.map((cuisine) => {
              return (
                <span
                  key={cuisine}
                  className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700"
                >
                  {cuisine}
                </span>
              );
            })}

            {/* cost */}
            {restaurantInfo.costForTwoMessage && (
              <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                {restaurantInfo.costForTwoMessage}
              </span>
            )}
          </div>
        </section>

        {/* Menu Items Started */}
        <section className="mt-8">
          <div className="m-6 flex items-center justify-center gap-3">
            <input
              type="text"
              className="h-10 w-full max-w-2xl rounded-lg border border-gray-300 px-3 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 active:scale-95"
              placeholder="Search for dishes or category..."
              value={searchMenuText}
              onChange={(e) => {
                setSearchMenuText(e.target.value);
              }}
            />
          </div>
          {/* Heading of menu */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Order online
              </p>
              <p className="mt-1 text-2xl font-extrabold text-slate-950">
                Complete Menu
              </p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {Object.keys(groupedMenuItems).length} categories available
            </p>
          </div>
          {/* Categories */}
          <div>
            {Object.entries(groupedMenuItems).map(
              ([categoryName, curCategoryItems], index) => {
                // console.log(categoryName);
                // console.log(curCategoryItems);
                return (
                  <MenuCategory
                    key={categoryName}
                    categoryName={categoryName}
                    curCategoryItems={curCategoryItems}
                    // showCategory={index === showCategory? true : false}
                    // setShowCategory={()=>setShowCategory(index)}
                  />
                );
              },
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RestaurantMenu;
