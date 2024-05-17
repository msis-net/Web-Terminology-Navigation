export const navlist = [
  {
    name: "Dashbord",
    symbol: "speed",
    open: false,
    lists: [
      {
        label: "index1",
        symbol: "fiber_manual_record",
        context: "index1",
        url: "/index1",
      },
      {
        label: "index2",
        symbol: "fiber_manual_record",
        context: "index2",
        url: "/index2",
      },
      {
        label: "index3",
        symbol: "fiber_manual_record",
        context: "index3",
        url: "/index3",
      },
    ],
  },
  {
    name: "Toggle",
    symbol: "segment",
    open: false,
    lists: [
      {
        label: "list1",
        symbol: "label",
        context: "list1",
      },
      {
        label: "list2",
        symbol: "label_important",
        context: "list2",
      },
      {
        label: "list3",
        symbol: "adjust",
        context: "list3",
      },
      {
        label: "list4",
        symbol: "fiber_smart_record",
        context: "",
        sublist: {
          name: "list4",
          symbol: "fiber_smart_record",
          open: false,
          lists: [
            {
              label: "sublist1",
              symbol: "fiber_manual_record",
              context: "sublist1",
            },
            {
              label: "sublist2",
              symbol: "fiber_manual_record",
              context: "sublist2",
            },
            {
              label: "sublist3",
              symbol: "fiber_manual_record",
              context: "",
              sublist: {
                name: "sublist3",
                symbol: "fiber_smart_record",
                open: false,
                lists: [
                  {
                    label: "sublist3-1",
                    symbol: "fiber_manual_record",
                    context: "sublist3-1",
                  },
                  {
                    label: "sublist3-2",
                    symbol: "fiber_manual_record",
                    context: "sublist3-2",
                  },
                  {
                    label: "sublist3-3",
                    symbol: "fiber_manual_record",
                    context: "sublist3-3",
                  },
                ],
              },
            },
          ],
        },
      },
      {
        label: "list5",
        symbol: "fiber_manual_record",
        context: "list5",
      },
    ],
  },
];
