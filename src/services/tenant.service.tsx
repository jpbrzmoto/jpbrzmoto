import { CheckBox } from "@mui/icons-material";
import { isAction } from "@reduxjs/toolkit";

export const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'IDRAARHPDB004',
                data: 'Documents Folder',
                icon: 'pi pi-fw pi-inbox',
                leaf: false,
                children: [
                    {
                        key: '0-0',
                        label: 'AR_DEV',
                        data: 'Work Folder',
                        leaf: false
                    },
                    {
                        key: '0-1',
                        label: 'BO_DEV',
                        data: 'Home Folder',
                        leaf: false
                    }
                ]
            }

        ];
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
