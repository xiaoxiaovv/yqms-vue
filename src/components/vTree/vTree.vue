<template>
	<div>
		<el-tree 
			class="filter-tree" 
			:data="treeData" 
			:props="defaultProps" 
			default-expand-all 
			:filter-node-method="filterNode" 
			@node-click="handleTreeClick"
			ref="tree">
			<span class="custom-tree-node" slot-scope="{ node, data }">
		        <span class="el-tree-label">
		            <i v-show="node.data.kstype == '2'" class="icon_file"></i>{{ node.label}}
		        </span>
			</span>
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: 'vTree',
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		props: ['treeData','filterText'],
		data() {
			return {
				defaultProps: {
					id: 'id',
					kstype: 'kstype',
					children: 'children',
					label: 'name',
				}
			};
		},
		methods: {
			//主题树点击事件
			handleTreeClick(params) {
				this.$emit('handleTree',params);
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			}
		},
	};
</script>
<style scoped>
	@import url("./vTree.css");
</style>