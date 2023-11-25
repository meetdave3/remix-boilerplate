import { getTranslation } from "~/utils/i18n";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await getTranslation(request);

  return { exampleMessage: t.h1 };
}

export default function Index() {
  const { exampleMessage } = useLoaderData<typeof loader>();

  return (
    <div className="p-10 max-w-5xl m-auto">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1 className="text-2xl text-blue-600">{exampleMessage} Welcome to Remix</h1>
      </div>
    </div>
  );
}

