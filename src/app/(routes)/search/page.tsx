import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import React, { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
    const { query } = await searchParams;
  return (
    <div className="flex justify-center">
      <div className="max-w-md mx-auto">
        <SearchForm />
        {typeof query !== "undefined" && (
          <Suspense fallback={<Preloader/>}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
